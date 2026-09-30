import { sayHello } from "../src/say-hello.js";

describe('sayHello', function () {
    it('should return hello adit', function () {
        expect(sayHello('adit')).toBe('Hello adit');
    });
});