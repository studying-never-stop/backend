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
                            'children': [],
                        },
                        ],
                'order' : 1,
            },
            {
                'id': '103',
                'authName': '权限管理',
                'path': 'rights',
                'icon': 1,
                'children': [
                    {
                    'id': '104',
                    'authName': '一级权限',
                    'path': 'rights',
                    'children': [],
                    },{
                    'id': '105',
                    'authName': '二级权限',
                    'path': 'rights2',
                    'children': [],
                    },{
                    'id': '106',
                    'authName': '三级权限',
                    'path': 'rights3',
                    'children': [],
                    },
                ],
                'order' : 2,
            },
            {
                'id': '101',
                'authName': '商品管理',
                'path': 'goods',
                'icon': 2,
                'children': [
                        {
                            'id': '117',
                            'authName': '商品列表',
                            'path': 'goods',
                            'children': [],
                        },
                    ],
                'order' : 3,
            },
            {
                'id': '102',
                'authName': '订单管理',
                'path': 'orders',
                'icon': 3,
                'children': [
                        {
                            'id': '114',
                            'authName': '订单管理',
                            'path': 'orders',
                            'children': [],
                        },
                    ],
                'order' : 4,
            },
            {
                'id': '145',
                'authName': '数据统计',
                'path': 'params',
                'icon': 4,
                'children': [
                        {
                            'id': '118',
                            'authName': '数据统计',
                            'path': 'params',
                            'children': [],
                        },
                    ],
                'order' : 5,
            },
            ],
        }
    }
}
