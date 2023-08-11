// @ts-nocheck
export const fromBase64String = (base64string) => {
  return Buffer.from(base64string, 'base64').toString('utf-8');
};

export const toBase64String = (string) => {
  return Buffer.from(string).toString('base64');
};

export const convertRuleFileToStringSafe = (ruleFile) => {
  const replacers = {
    'pr.description': 'pr.description | nl2br | dump | safe',
  };
  return Object.keys(replacers).reduce((acc, toReplace) => {
    return acc.replaceAll(toReplace, replacers[toReplace]);
  }, ruleFile);
};

export const convertPRContextFromBase64 = (prContext) => {
  return {
    ...prContext,
    description: fromBase64String(prContext.description),
    // deprecated
    general_comments: prContext.general_comments?.map((generalComment) => ({
      ...generalComment,
      content: fromBase64String(generalComment.content),
    })),
    // deprecated
    line_comments: prContext.line_comments?.map((lineComments) => ({
      ...lineComments,
      content: fromBase64String(lineComments.content),
    })),
    comments: prContext.comments?.map((comment) => ({
      ...comment,
      content: fromBase64String(comment.content),
    })),
    reviews: prContext.reviews?.map((comment) => ({
      ...comment,
      content: fromBase64String(comment.content),
      conversations: comment.conversations?.map((conversation) => ({
        ...conversation,
        content: fromBase64String(conversation.content),
      })),
    })),
    conversations: prContext.conversations?.map((comment) => ({
      ...comment,
      content: fromBase64String(comment.content),
    })),
  };
};
