import Vue from 'vue'
import
{
  Button, Form, Calendar, Dropdown, Progress, DropdownMenu, DropdownItem, Badge, FormItem, Input, Message, Container, Header,
  Main, Aside, Submenu, MenuItem, MenuItemGroup, Menu, Col, Breadcrumb, BreadcrumbItem, Card, Row,
  Table, TableColumn, Pagination, Switch, Tooltip,
  MessageBox, Dialog, Tag, Drawer, Tree, Select, Option
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Menu)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Badge)
Vue.use(Progress)
Vue.use(Calendar)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Drawer)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
// Vue.use(MessageBox)
// 添加了全局方法 $message
Vue.prototype.$message = Message
Vue.prototype.$messageBox = MessageBox
