import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class MenuService {

    public async getMenu(){
        return {
            code: 0,
            msg: [        {
                'id': '125',
                'authName': '用户管理',
                'path': 'users',
                'icon': 0,
                'children': [
                        {
                            'id': '110',
                            'authName': '用户列表',
                            'path': 'users',
                            'icon': 0,
                            'children': [],
                        },
                        ],
                'order' : 1,
            },
            {
                'id': '103',
                'authName': '图书管理',
                'path': 'books',
                'icon': 1,
                'children': [
                    {
                    'id': '104',
                    'authName': '书籍管理',
                    'icon': 1,
                    'path': 'books',
                    'children': [],
                    },
                ],
                'order' : 2,
            },
            {
                'id': '101',
                'authName': '数据统计',
                'path': 'reports',
                'icon': 2,
                'children': [
                        {
                            'id': '117',
                            'authName': '统计',
                            'path': 'reports',
                            'icon': 2,
                            'children': [],
                        },
                    ],
                'order' : 3,
            },
            {
                'id': '102',
                'authName': '借阅管理',
                'path': 'orders',
                'icon': 3,
                'children': [
                        {
                            'id': '114',
                            'authName': '借阅管理',
                            'path': 'lend',
                            'icon': 3,
                            'children': [],
                        },
                        {
                            'id': '115',
                            'authName': '归还管理',
                            'path': 'return',
                            'icon': 6,
                            'children': [],
                        },
                    ],
                'order' : 4,
            },
            {
                'id': '145',
                'authName': '主页',
                'path': 'params',
                'icon': 4,
                'children': [
                        {
                            'id': '118',
                            'authName': '主页',
                            'path': 'homepage',
                            'icon': 5,
                            'children': [],
                        },
                        {
                            'id': '119',
                            'authName': '我的空间',
                            'path': 'mySpace',
                            'icon': 4,
                            'children': [],
                        },
                    ],
                'order' : 5,
            },
            ],
        }
    }
}
