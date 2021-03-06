/**
 * @author: HuRuiFeng
 * @file: ConstantPool.class.js
 * @time: 2019/10/18 15:50
 * @desc: 运行时常量池，主要存放两类信息：字面量和符号引用，字面量包括整数、浮点数和字符串字面量；
 符号引用包括类符号引用、字段符号引用、方法符号引用和接口符号引用。
 */

let format = require('string-format');
const InterfaceMethodRef = require("./CpInterfaceMethodRef.class").InterfaceMethodRef;
const MethodRef = require("./CpMethodRef.class").MethodRef;
const FieldRef = require("./CpFieldRef.class").FieldRef;
const ClassRef = require("./CpClassRef.class").ClassRef;
const ConstantInterfaceMethodRefInfo = require("../../classfile/ConstantMemberRefInfo.class").ConstantInterfaceMethodRefInfo;
const ConstantMethodRefInfo = require("../../classfile/ConstantMemberRefInfo.class").ConstantMethodRefInfo;
const ConstantFieldRefInfo = require("../../classfile/ConstantMemberRefInfo.class").ConstantFieldRefInfo;
const ConstantClassInfo = require("../../classfile/ConstantClassInfo.class").ConstantClassInfo;
const ConstantStringInfo = require("../../classfile/ConstantStringInfo.class").ConstantStringInfo;
const ConstantDoubleInfo = require("../../classfile/CpNumeric.class").ConstantDoubleInfo;
const ConstantLongInfo = require("../../classfile/CpNumeric.class").ConstantLongInfo;
const ConstantFloatInfo = require("../../classfile/CpNumeric.class").ConstantFloatInfo;
const ConstantIntegerInfo = require("../../classfile/CpNumeric.class").ConstantIntegerInfo;
format.extend(String.prototype);

class ConstantPool {
    constructor(clazz, consts) {
        this._class = clazz;
        this.consts = consts;
    }

    static new_constant_pool(clazz, cfConstantPool) {
        let cp_count = cfConstantPool.cp.length;
        let consts = Array(cp_count).fill(null);

        let rt_constant_pool = new ConstantPool(clazz, consts);
        for (let i = 1; i < cp_count; i++) {
            let cp_info = cfConstantPool.cp[i];
            switch (cp_info.constructor) {
                case ConstantIntegerInfo:
                    consts[i] = cp_info.val;
                    break;
                case ConstantFloatInfo:
                    consts[i] = cp_info.val;
                    break;
                case ConstantLongInfo:
                    consts[i] = cp_info.val;
                    break;
                case ConstantDoubleInfo:
                    consts[i] = cp_info.val;
                    break;
                case ConstantStringInfo:
                    consts[i] = cp_info.toString();
                    break;
                case ConstantClassInfo:
                    consts[i] = new ClassRef(rt_constant_pool, cp_info);
                    break;
                case ConstantFieldRefInfo:
                    consts[i] = new FieldRef(rt_constant_pool, cp_info);
                    break;
                case ConstantMethodRefInfo:
                    consts[i] = new MethodRef(rt_constant_pool, cp_info);
                    break;
                case ConstantInterfaceMethodRefInfo:
                    consts[i] = new InterfaceMethodRef(rt_constant_pool, cp_info);
                    break;
            }
        }

        return rt_constant_pool;
    }

    get_class() {
        return this._class;
    }

    // 根据索引返回常量
    get_constant(index) {
        let c = this.consts[index];
        if (c != null) {
            return c;
        } else {
            throw new Error("No constants at index {0}".format(index))
        }
    }
}

exports.ConstantPool = ConstantPool;