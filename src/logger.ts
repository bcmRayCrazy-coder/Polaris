import chalk, { Chalk } from 'chalk';

export function getBadage(label: string, style: Chalk): string {
    return style.bold.white(` ${label} `);
}

export function info(...args: string[]) {
    console.log(getBadage('INFO', chalk.bgCyan), args.join(' '));
}

export function success(...args: string[]) {
    console.log(getBadage('SUCCESS', chalk.bgGreen), args.join(' '));
}

export function warning(...args: string[]) {
    console.log(getBadage('WARN', chalk.bgYellow), args.join(' '));
}

export function error(...args: string[]) {
    console.log(getBadage('ERROR', chalk.bgRed), args.join(' '));
}
