import chalk, { Chalk } from 'chalk';

export function getBadage(label: string, style: Chalk): string {
    return style.white(` ${label} `);
}

export function info(...args: string[]) {
    console.log(getBadage('Info', chalk.bgCyan), args.join(' '));
}

export function success(...args: string[]) {
    console.log(getBadage('Success', chalk.bgGreen), args.join(' '));
}

export function warning(...args: string[]) {
    console.log(getBadage('Warn', chalk.bgYellow), args.join(' '));
}

export function error(...args: string[]) {
    console.log(getBadage('Error', chalk.bgRed), args.join(' '));
}
