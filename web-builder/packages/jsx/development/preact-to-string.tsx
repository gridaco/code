import { render } from 'preact-render-to-string';
import { h } from 'preact';
/** @jsx h */

let vdom = <div style={{
    height: 120
}} class="foo">content</div>;

let html = render(vdom);
console.log(html);
// <div class="foo">content</div>