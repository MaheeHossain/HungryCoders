let something = {
    num1: 25,
    num2: 35,
    print_sum() {
        return this.num1 + this.num2;
    },
};

allthings = [];
allthings = [something];

something = null;

console.log(allthings[0].print_sum());