// @ts-check

/**
 * @typedef {"info"|"warn"|"error"} Severity
 *
 * @typedef {Object} Evidence
 * @property {string} source  - e.g., "android/build.gradle" or "build.log"
 * @property {string} detail  - matched line/snippet
 *
 * @typedef {Object} Finding
 * @property {string} id
 * @property {string} title
 * @property {Severity} severity
 * @property {number} confidence  - 0..1
 * @property {string[]} fixes
 * @property {Evidence[]} evidence
 *
 * @typedef {Object} Context
 * @property {string} root
 * @property {Record<string, any>} pkg
 * @property {string|null} rnVersion
 * @property {Record<string, string | null>} filesText  - cache of file contents
 * @property {string|null} logText
 *
 * @typedef {Object} Rule
 * @property {string} id
 * @property {string} title
 * @property {(ctx: Context) => Promise<Finding|null>|Finding|null} run
 */

export {};

