import { error, info, success, warning } from '../logger';

test('logger', () => {
    info('这是一条info');
    warning('这是一条warning');
    error('这是一条error');
    success('这是一条success');
});
