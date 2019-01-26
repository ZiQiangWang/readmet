{{#if badge.npm_version}}
[![NPM Version][npm-badge]][npm-url]
{{/if}}
{{#if badge.build_status}}
[![Build Status][travis-badge]][travis-url]
{{/if}}
{{#if badge.downloads_status}}
[![Downloads status][npm-downloads]][npm-url]
{{/if}}
{{#if badge.coverage_status}}
[![Coverage Status][coveralls-badge]][coveralls-url]
{{/if}}

{{#if badge.npm_version}}
[npm-badge]: https://img.shields.io/npm/v/{{package_name}}.svg?style={{badge_style}}
{{/if}}
[npm-url]: https://npmjs.org/package/{{package_name}}

{{#if badge.downloads_status}}
[npm-downloads]: https://img.shields.io/npm/dm/{{package_name}}.svg?style={{badge_style}}
{{/if}}

{{#if badge.build_status}}
[travis-badge]: https://img.shields.io/travis/{{username}}/{{package_name}}/master.svg?style={{badge_style}}
[travis-url]: https://travis-ci.org/{{username}}/{{package_name}}
{{/if}}

{{#if badge.coverage_status}}
[coveralls-badge]: https://img.shields.io/coveralls/github/{{username}}/{{package_name}}.svg?style={{badge_style}}
[coveralls-url]: https://coveralls.io/github/{{username}}/{{package_name}}
{{/if}}
