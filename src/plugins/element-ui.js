import Vue from 'vue'
import {
  Button,
  Col,
  Row,
  Main,
  Card,
  InputNumber,
  Form,
  FormItem,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Notification,
  Loading
} from 'element-ui'

Vue.use(Button)
Vue.use(Col)
Vue.use(Row)
Vue.use(Main)
Vue.use(Card)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Loading.directive)

Vue.prototype.$notify = Notification
Vue.prototype.$loading = Loading.service
