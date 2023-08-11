/**
 * @typedef Contributor
 * @property {integer} id.required
 * @property {boolean} is_parent.required - The organization id
 * @property {integer} parent_id.required - The type id
 */
export interface IContributor {
    id: number;
    is_parent: boolean;
    parent_id: number;
}
