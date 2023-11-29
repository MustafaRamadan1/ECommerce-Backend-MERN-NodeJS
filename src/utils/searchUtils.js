import apiError from '../utils/appError';
import AppFeature from './appFeature'; // Import the AppFeature class

class searchUtils {
    query;
    model;
    schemaPaths;
    filterBy = {};

    constructor(model, queryString) {
        this.model = model;
        this.queryString = queryString;
        this.schemaPaths = Object.keys(this.model.schema.paths);
        this.query = null;
    }

    async search() {
        const { searchField, searchValue } = this.queryString;

        this.schemaPaths.forEach((field) => {
            if (field === searchField) this.filterBy[field] = new RegExp(searchValue, 'i');
        });

        if (!this.schemaPaths.includes(searchField)) {
            throw new apiError('No results found for your search', 204);
        }

        if (searchField && searchValue) {
            const query = this.model.find(this.filterBy);
            this.query = await query.exec();
        }

        // Return this instance to enable chaining
        return this;
    }

}

export default searchUtils;
