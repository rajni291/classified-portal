import mock from './CategoryMock.json';
class CategoryService{
    getAllCategory(){
        return Promise.resolve(mock);
    }
}

export let categoryService = new CategoryService();