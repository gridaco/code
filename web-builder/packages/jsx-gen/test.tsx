
import { h } from 'preact';
import { render } from 'preact-render-to-string';


const Fox = ({ name }) => (
    <div class="fox" >
        <h5>{name} </h5>
        <p> This page is all about {name}.</p>
    </div>
);

let html = render(<Fox name={'sweety'} />);


export function logit() {
    console.log(html)
}
