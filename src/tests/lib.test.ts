import { ItemTable } from '../db/types/ItemTable';
import { UsersTable } from '../db/types/UserTable';
import { IronBlockAttackItem } from '../game/items/attackItems';
import { EnduranceEnchantItem } from '../game/items/enchantItems';
import {
    connect2id,
    getHash,
    getPage,
    info2text,
    table2item,
    tag2text,
} from '../game/lib';

test('tag转文字', () => {
    var originData = '这是一个tag';
    console.log('原始数据:', originData);
    console.log('结果:', tag2text(originData));
});

test('用户信息转文字', () => {
    var originData: UsersTable = {
        id: 114,
        name: 'homo',
        health: 514,
        coin: 999,
        level: 2,
        exp: 34,
        vip: 2,
        admin: true,
    };
    console.log('原始数据:', originData);
    console.log('结果:', info2text(originData));
});

test('连接id', () => {
    var originData = ['this', 'is', 'a', 'id'];
    console.log('原始数据:', originData);
    console.log('结果:', connect2id(...originData));
    console.log('传入undefined:', connect2id());
});

test('获取hash', () => {
    for (let i = 1; i <= 10; i++) {
        console.log('第', i, '个hash:', getHash());
    }
});

test('页面测试', () => {
    var originData = '1234567890wertyuiopasdghjklzxcvbm'.split('');
    console.log('原始数据:', originData);
    console.log('页面 1, 长度 4', getPage(1, originData, 4));
    console.log('页面 1, 长度 10', getPage(1, originData, 10));
    console.log('页面 2, 长度 10', getPage(2, originData, 10));
    console.log('页面 5, 长度 3', getPage(5, originData, 3));
});

test('还原item', () => {
    var targetItem = new IronBlockAttackItem();
    targetItem.enchant(new EnduranceEnchantItem(5));
    var originData: ItemTable = {
        hash: getHash(),
        owner: 114514,
        id: targetItem.id,
        name: targetItem.name,
        metadata: targetItem.getItemMetadata(),
    };
    console.log('原始数据:', originData);
    console.log('目标数据:', targetItem);
    var item = table2item(originData);
    console.log('结果:', item);
    console.log('附魔数据:', item.metadata.enchants || '空');
    expect(item.getItemMetadata()).toStrictEqual(targetItem.getItemMetadata());
});
