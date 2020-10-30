const { validateEmail } = require("./../api/lib/validator");

describe("Validate Email", () => {
    it("email is valid", () => {
        const email = "jesus@makeitreal.com";
        expect(validateEmail(email)).toBe(true);
    });
    it("email is not valid", ()=> {
        const email = "jesus";
        expect(validateEmail(email)).toBe(false);
    });
});