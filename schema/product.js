const ProductSchema = {
    name: null,
    description: null,
    type: 1, //1- Product, 2-Service
    pos: null,
    visible: null,
    media: {
        type: null, //1-Image, 2-GIF, 3-Video
        url: null
    },
    category: {
        name: null,
        category_id: null
    },
    stock: {
        qty: null,
        unit: null
    },
    price: {
        visible_type: null, //0 -Hidden, 1-Price per unit, 2-Price Range
        per_unit_range: null,
        per_unit_amount: null,
        unit: null
    },
    variance: {
        attributes: null, //[{size: [L, XL]}, {color: [Blue, Red]}]
        val_map: null //{L_Blue: {price: null, description: null...}}
    },
    additional_info: null, //{}
    reviews: null, //[{stars: null, comments: null}]
    policies: null, //[{policy_name: null, policy_id: null}]
    questions: null, //[{question: null, answer: null}]
};

module.exports = ProductSchema;