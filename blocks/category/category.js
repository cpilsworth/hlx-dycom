import { h, Component, render } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';

const html = htm.bind(h);

class ProductList extends Component  {
    render({ category},  { products = []}) {
        return html`<div>
            <p>Hello ${category}!</p>
            ${products.map(product => html`<p>${product.title}</p>`)}
          </div>      
        `;
    }
    componentDidMount() {
        fetch('https://cyclic-ninth-yam.glitch.me/products')
            .then(res => res.json())
            .then(products => { this.setState({ products }) });
    }
}

export default function decorate(block) {
    const category = block.textContent.trim();
    console.log(`category: ${category}`);
    block.textContent = '';
    render(html`<${ProductList} category=${category}/>`, block);
  }
