/**
 * @author: HuRuiFeng
 * @file: Rem.class.js
 * @time: 2019/10/17 16:21
 * @desc: 求余(rem)指令
 */

const NoOperandsInstruction = require("../base/Instruction.class").NoOperandsInstruction;

// double remainder
class DREM extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_double();
        let v1 = stack.pop_double();
        let result = v1 % v2;
        stack.push_double(result);
    }
}

// float remainder
class FREM extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_float();
        let v1 = stack.pop_float();
        let result = v1 % v2;
        stack.push_float(result);
    }
}

// int remainder
class IREM extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_numeric();
        let v1 = stack.pop_numeric();
        if (v2 === 0) {
            throw new Error("java.lang.ArithmeticException: / by zero");
        }
        let result = v1 % v2;
        stack.push_numeric(result);
    }
}

// long remainder
class LREM extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_numeric();
        let v1 = stack.pop_numeric();
        if (v2 === 0) {
            throw new Error("java.lang.ArithmeticException: / by zero");
        }
        let result = BigInt(v1) % BigInt(v2);
        stack.push_numeric(result);
    }
}

module.exports = {
    DREM: DREM,
    FREM: FREM,
    IREM: IREM,
    LREM: LREM
};