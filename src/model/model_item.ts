export const mountBody = (req: any): string => {
    let body: any = {};

    if (req.title)
        body.title = req.title;

    if (req.category_id)
        body.category_id = req.category_id;

    if (req.price)
        body.price = req.price;

    if (req.currency_id)
        body.currency_id = req.currency_id;

    if (req.available_quantity)
        body.available_quantity = req.available_quantity;

    if (req.listing_type_id)
        body.listing_type_id = req.listing_type_id;

    if (req.condition)
        body.condition = req.condition;

    if (req.description)
        body.description = req.description;

    if (req.attributes)
        body.attributes = req.attributes;

    if (req.tags)
        body.tags = req.tags;

    if (req.pictures)
        body.pictures = req.pictures;

    if (req.buying_mode)
        body.buying_mode = req.buying_mode;

    return body;   
}
