/**
 * @author: HuRuiFeng
 * @file: cmd.js
 * @time: 2019/10/12
 * @desc: 命令行类
 */

class Cmd {
    constructor(program) {
        this.cpOption = program.classpath;
        this.class_name = program.args[0];
        this.args = program.args.slice(1);
        this.version = program.version();
    }

    print_classpath() {
        console.log('classpath:%j class:%j args:%j\n', this.cpOption, this.class_name, this.args)
    }

    print_args() {
        return '[' + this.args.join(' ') + ']';
    }
}

exports.Cmd = Cmd;
