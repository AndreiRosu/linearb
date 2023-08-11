export const actionExpectedResult = {
  errors: {},
  validatorErrors: {},
  automations: {
    suggest_code_experts: {
      if: [
        {
          passed: true,
        },
      ],
      run: [
        {
          action: 'explain-code-experts@v1',
          args: {
            gt: 10,
            comment:
              'base64: 8J+ltyAqKkNvZGUgZXhwZXJ0czogRmFkaWtoYXlvMTk5NSwgb3JpZWx6KiogCiAKRmFkaWtoYXlvMTk5NSwgeWVlbGFsaTE0IGhhdmUgbW9zdCDwn5Gp4oCN8J+SuyAqKmFjdGl2aXR5KiogaW4gdGhlIGZpbGVzLiAKb3JpZWx6LCBGYWRpa2hheW8xOTk1IGhhdmUgbW9zdCDwn6egICoqa25vd2xlZGdlKiogaW4gdGhlIGZpbGVzLiAKIDxkZXRhaWxzPgogPHN1bW1hcnk+U2VlIGRldGFpbHM8L3N1bW1hcnk+CgoKYHNyYy9BcHAuanNgIAogCgpBY3Rpdml0eSBiYXNlZCBvbiBnaXQtY29tbWl0OiAKCiB8ICB8IEZhZGlraGF5bzE5OTUgfCB5ZWVsYWxpMTR8IAogfCAtLS0gfCAtLS0gfCAtLS0gfCAKIHwgQVVHIHwgICB8ICAKfCBKVUwgfCAgIHwgIAp8IEpVTiB8ICAgfCAgCnwgTUFZIHwgICB8ICAKfCBBUFIgfCAgIHwgIAp8IE1BUiB8ICAgfCAgCiAKCktub3dsZWRnZSBiYXNlZCBvbiBnaXQtYmxhbWU6IAogb3JpZWx6OiA1OSUgCgo8L2RldGFpbHM+CiAKCiAKIApUbyBsZWFybiBtb3JlIGFib3V0IC86XCBnaXRTdHJlYW0gLSBbVmlzaXQgb3VyIERvY3NdKGh0dHBzOi8vZG9jcy5naXRzdHJlYW0uY20vKSAKIAogCg==\n',
          },
        },
      ],
      passed: true,
    },
    approve_safe_changes: {
      if: [
        {
          passed: false,
        },
      ],
      run: [
        {
          action: 'approve@v1',
        },
      ],
      passed: false,
    },
  },
  analytics: {
    match: {
      args: [
        {
          term: 'suggest-reviewer',
          __keywords: true,
        },
      ],
    },
    some: {
      args: [],
    },
    isFormattingChange: {
      args: [],
    },
    allDocs: {
      args: [],
    },
    allImages: {
      args: [],
    },
  },
};
