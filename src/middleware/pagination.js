'use strict';

module.exports = function paginator(items, page, perPage) {
    var page = page,
        offset = (page - 1) * perPage,
        paginatedItems = items.slice(offset).slice(0, perPage),
        total_pages = Math.ceil(items.length / perPage);
    // console.log(paginatedItems.data);
    return {
        from: ((perPage * page) - perPage) + 1,
        to: perPage * page,
        currentPage: page,
        perPage: perPage,
        total: items.length,
        lastPage: total_pages,
        content: paginatedItems
    };
};

