import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Theme']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'User',
    route: '/icons',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Customer',
        to: '/user/customer',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Instructor',
        to: '/user/instructor',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Groups',
        to: '/user/groups',

      },
    ],
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'User Management',
  //   to: '/theme/colors',
  //   icon: 'cil-drop',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'User Add',
  //   to: '/base/tabs',
  //   icon: 'cil-drop',
  // },
  //{
  //  _tag: 'CSidebarNavItem',
  //  name: 'Instructors Management',
  //  to: '/base/jumbotrons',
  //  icon: 'cil-drop',
  //},
  //{
  //  _tag: 'CSidebarNavItem',
  //  name: 'Instructors Add',
  //  to: '/base/collapses',
  //  icon: 'cil-drop',
  //},
  {
    _tag: 'CSidebarNavItem',
    name: 'Corporate Client Accounts',
    to: '/theme/typography',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Course Manage',
    route: '/icons',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Course Add',
        to: '/course-add',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Course Listing',
        to: '/courselisting',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Sections Manage',
        to: '',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Lacture Manage',
        to: '/icons/brands',
      },{
        _tag: 'CSidebarNavItem',
        name: 'Material Manage',
        to: '/notifications/alerts',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Orders',
    route: '/buttons',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Orders',
        to: '/notifications/toaster',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Billings',
        to: '',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Refund Manage',
        to: '/buttons/button-groups',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'payments',
        to: '/buttons/button-dropdowns',
      }
    ],
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Categories',
    route: '/buttons',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Listing',
        to: '/Category',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add ',
        to: '/categories/categoriesadd',
      }

//      {
//        _tag: 'CSidebarNavItem',
//        name: 'SubCategories',
//        to: '/buttons/brand-buttons',
//      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Course master',
    route: '',
    icon: 'cil-bell',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Topic',
        to: '/topic',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Level',
        to: '/level',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Price',
        to: '/price',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Language',
        to: '/language',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Duration',
        to: '/duration',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Features',
        to: '/features',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Subtitles',
        to: '/subtitles',
      }
    ]
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Components']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'CMS',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Page Add',
        to: '/base/switches',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Page pages',
        to: '/base/breadcrumbs',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Menu Add',
        to: '/base/progress-bar',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Menu',
        to: '/base/cards',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'MenuItems Add',
        to: '/base/popovers',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Menu items',
        to: '/base/carousels',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Support Panal',
//        to: '/base/collapses',
        to: '',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Monitor',
//        to: '/base/forms',
         to: '',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Wallets',
        to: '/buttons/button-dropdowns',
//        to: '/base/jumbotrons',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Coupons Add',
        to: '/base/paginations',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Coupons',
        to: '/base/list-groups',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Reports',
        to: '/base/navs',
      },
//      {
//        _tag: 'CSidebarNavItem',
//        name: 'Navbars',
//        to: '/base/navbars',
//      },
//      {
//        _tag: 'CSidebarNavItem',
//        name: 'Pagination',
//        to: '/base/paginations',
//      },
//      {
//        _tag: 'CSidebarNavItem',
//        name: 'Popovers',
//        to: '/base/popovers',
//      },
//      {
//        _tag: 'CSidebarNavItem',
//        name: 'Progress',
//        to: '/base/progress-bar',
//      },
//      {
//        _tag: 'CSidebarNavItem',
//        name: 'Switches',
//        to: '/base/switches',
//      },
//      {
//        _tag: 'CSidebarNavItem',
//        name: 'Tables',
//        to: '/base/tables',
//      },
//      {
//        _tag: 'CSidebarNavItem',
//        name: 'Tabs',
//        to: '/base/tabs',
//      },
//      {
//        _tag: 'CSidebarNavItem',
//        name: 'Tooltips',
//        to: '/base/tooltips',
//      },
    ],
  },

//  {
//    _tag: 'CSidebarNavItem',
//    name: 'Charts',
//    to: '/charts',
//    icon: 'cil-chart-pie'
//  },

//  {
//    _tag: 'CSidebarNavDropdown',
//    name: 'Notifications',
//    route: '/notifications',
//    icon: 'cil-bell',
//    _children: [
//      {
//        _tag: 'CSidebarNavItem',
//        name: 'Alerts',
//        to: '/notifications/alerts',
//      },
//      {
//        _tag: 'CSidebarNavItem',
//        name: 'Badges',
//        to: '/notifications/badges',
//      },
//      {
//        _tag: 'CSidebarNavItem',
//        name: 'Modal',
//        to: '/notifications/modals',
//      },
//      {
//        _tag: 'CSidebarNavItem',
//        name: 'Toaster',
//        to: '/notifications/toaster'
//      }
//    ]
//  },
//  {
//    _tag: 'CSidebarNavItem',
//    name: 'Widgets',
//    to: '/widgets',
//    icon: 'cil-calculator',
//    badge: {
//      color: 'info',
//      text: 'NEW',
//    },
//  },
//  {
//    _tag: 'CSidebarNavDivider'
//  },
//  {
//    _tag: 'CSidebarNavTitle',
//    _children: ['Extras'],
//  },
//  {
//    _tag: 'CSidebarNavDropdown',
//    name: 'Pages',
//    route: '/pages',
//    icon: 'cil-star',
//    _children: [
//      {
//        _tag: 'CSidebarNavItem',
//        name: 'Login',
//        to: '/login',
//      },
//      {
//        _tag: 'CSidebarNavItem',
//        name: 'Register',
//        to: '/register',
//      },
//      {
//        _tag: 'CSidebarNavItem',
//        name: 'Error 404',
//        to: '/404',
//      },
//      {
//        _tag: 'CSidebarNavItem',
//        name: 'Error 500',
//        to: '/500',
//      },
//    ],
//  },
//  {
//    _tag: 'CSidebarNavItem',
//    name: 'Disabled',
//    icon: 'cil-ban',
//    badge: {
//      color: 'secondary',
//      text: 'NEW',
//    },
//    addLinkClass: 'c-disabled',
//    'disabled': true
//  },
//  {
//    _tag: 'CSidebarNavDivider',
//    className: 'm-2'
//  },
//  {
//    _tag: 'CSidebarNavTitle',
//    _children: ['Labels']
//  },
//  {
//    _tag: 'CSidebarNavItem',
//    name: 'Label danger',
//    to: '',
//    icon: {
//      name: 'cil-star',
//      className: 'text-danger'
//    },
//    label: true
//  },
//  {
//    _tag: 'CSidebarNavItem',
//    name: 'Label info',
//    to: '',
//    icon: {
//      name: 'cil-star',
//      className: 'text-info'
//    },
//    label: true
//  },
//  {
//    _tag: 'CSidebarNavItem',
//    name: 'Label warning',
//    to: '',
//    icon: {
//      name: 'cil-star',
//      className: 'text-warning'
//    },
//    label: true
//  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
