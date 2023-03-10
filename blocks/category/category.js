import { h, Component, render } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';

const html = htm.bind(h);

async function fetchProductsForCategory(category_id) {
    return fetch(`https://mag619.adobedemo.com/graphql?variables={"category_id":\"${category_id}\"}&query=query($category_id:[String]!){products(filter:{category_id:{in:$category_id}}){items{sku%20name%20image{url}meta_description price_range{maximum_price{final_price{value}}}}}}`)
    // return Promise.resolve(getStaticProductList(category_id))
        .then(response => response.json())
        .then(json => json.data.products.items);
}

const Product = ({ prod }) => html`
<li>
    <div class="cards-card-image">
        <img loading="lazy" alt="Dyson Corrale hair straightener" src=${prod?.image?.url} />
    </div>
    <div class="cards-card-body">
        <h4>${prod?.name}</h4>
        <p>${prod?.meta_description}</p>
    </div>
</li>`;

class ProductList extends Component  {
    render({category},  { products = []}) {
        return html`
            <div class="cards" id={category}>
                <ul>
                    ${products.map(product => html`<${Product} prod=${product}/>`)}
                </ul>
            </div>
        `;
    }
    async componentDidMount() {
        const products  = await fetchProductsForCategory(this.props.category);
        this.setState({ products });
    }
}

export default function decorate(block) {
    const category = block.textContent.trim();
    block.textContent = '';
    render(html`<${ProductList} category=${category}/>`, block);
  }

function getStaticProductList(category_id) {
    return {
        "data": {
            "products": {
                "items": [
                    {
                        "sku": "DV15DA",
                        "name": "Dyson V15 Detect Absolute",
                        "image": {
                            "url": "https://mag619.adobedemo.com/media/catalog/product/cache/ddf94e3f2b889b25118e5e75f97ef537/v/1/v15-black-friday-product-tile-iryenk.jpg_master.jpg"
                        },
                        "short_description": {
                            "html": ""
                        },
                        "price_range": {
                            "maximum_price": {
                                "final_price": {
                                    "value": 529.99
                                }
                            }
                        }
                    },
                    {
                        "sku": "DV12DSA",
                        "name": "Dyson V12 Detect Slim Absolute",
                        "image": {
                            "url": "https://mag619.adobedemo.com/media/catalog/product/cache/ddf94e3f2b889b25118e5e75f97ef537/b/l/black-friday-leap-tile-v12-398006-01.jpeg"
                        },
                        "short_description": {
                            "html": ""
                        },
                        "price_range": {
                            "maximum_price": {
                                "final_price": {
                                    "value": 429.99
                                }
                            }
                        }
                    },
                    {
                        "sku": "DV11AE",
                        "name": "Dyson V11 Absolute Extra",
                        "image": {
                            "url": "https://mag619.adobedemo.com/media/catalog/product/cache/ddf94e3f2b889b25118e5e75f97ef537/b/l/black-friday-leap-tile-v11_v2.jpeg"
                        },
                        "short_description": {
                            "html": ""
                        },
                        "price_range": {
                            "maximum_price": {
                                "final_price": {
                                    "value": 479
                                }
                            }
                        }
                    },
                    {
                        "sku": "DV10A",
                        "name": "Dyson V10 Absolute",
                        "image": {
                            "url": "https://mag619.adobedemo.com/media/catalog/product/cache/ddf94e3f2b889b25118e5e75f97ef537/8/4/8417922-bf-22-product_card_v10_abs.jpeg"
                        },
                        "short_description": {
                            "html": ""
                        },
                        "price_range": {
                            "maximum_price": {
                                "final_price": {
                                    "value": 329.99
                                }
                            }
                        }
                    },
                    {
                        "sku": "DV10E",
                        "name": "Dyson V10 Extra",
                        "image": {
                            "url": "https://mag619.adobedemo.com/media/catalog/product/cache/ddf94e3f2b889b25118e5e75f97ef537/8/4/8417922-bf-22-product_card_v10_extra.jpeg"
                        },
                        "short_description": {
                            "html": ""
                        },
                        "price_range": {
                            "maximum_price": {
                                "final_price": {
                                    "value": 319.99
                                }
                            }
                        }
                    }
                ]
            }
        }
    };
}