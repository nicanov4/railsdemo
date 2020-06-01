import { error } from './notifications';

export const handleAjaxError = (err) => {
    error('Something went wrong');
    console.warn(err);
};

export const isEmptyObject = obj => Object.keys(obj).length === 0;

export const validateArticle = (article) => {
    const errors = {};

    if (article.title === '') {
	errors.title = 'You must enter a title';
    }

    if (article.text === '') {
	errors.text = 'You must enter text';
    }

    return errors;
}
