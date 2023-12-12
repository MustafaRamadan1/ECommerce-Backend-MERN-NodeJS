class AppFeature {

    constructor(query, queryString)
    {
        this.query= query;
        this.queryString = queryString;
    }

    filter()
    {
        const ourQuery = {...this.queryString};

        const exculdedFeilds = ['page', 'limit', 'sort', 'fields'];

        exculdedFeilds.forEach((e)=> delete ourQuery[e]);

        this.query = this.query.find(ourQuery);
        return this;
    }

    sort(){


        if (this.queryString.sort)
        {   
            const sortFields = this.queryString.sort.split(', ').join(' ');

            this.query = this.query.sort(sortFields);
        }
        else
        {
            this.query = this.query.sort('-CreatedAt')
        }
        return this
    }

    limitFields(){

        if (this.queryString.fields)
        {
            const fields = this.queryString.fields.split(', ').join(' ');
            
            this.query = this.query.select(fields);
        }
        return this
    }

    pagination(documentsPerPage ){
        const skip = this.queryString.page * this.queryString.limit;
        this.query.skip(skip).limit(this.queryString.limit);
    // const page = this.queryString.page * 1 || 1;

    // const limit = this.queryString.limit || documentsPerPage;

    // const skip =  (page - 1 ) * limit;
console.log(this.query);
    // this.query = this.query.skip(skip).limit(limit);

    return this;
    }
}

export default AppFeature