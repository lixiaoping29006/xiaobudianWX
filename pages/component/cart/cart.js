Page({
  data: {
    carts: [],              //购物车列表
    hasList: false,         //列表是否有数据
    totalPrice: 0,          //总价，
    totalNum: 0,            //数量，
    selectAllStatus: true,  //全选，默认全选
  },
  onShow(){
    this.setData({
      hasList: true,
      carts: [
        {
          id: 1, title: '新鲜芹菜', imageUrl: '../../image/s5.png', total:4,price: 4,selected: true,
        },
        {
          id: 2, title: '干货西瓜子', imageUrl: '../../image/s4.png', total: 3, price: 2, selected: true
        },
        {
          id: 3, title: '泰国香米', imageUrl: '../../image/s6.png', total: 2, price: 1, selected: true
        }
      ]
    })
    this.getTotalPrice()
  },
  /**列表选中的list */
  selectList(e){
    console.log(e,'--->ee')
    const index = e.currentTarget.dataset.index
    let carts = this.data.carts
    const selected = carts[index].selected
    carts[index].selected = !selected
    this.setData({
      carts: carts,
    })
    this.getTotalPrice()
  },
  /*购物车全选事件 */
  selectAll(e){
    let selectAllStatus = this.data.selectAllStatus
    let carts = this.data.carts
    selectAllStatus = !selectAllStatus
    carts.map(item=>{
      item.selected = selectAllStatus
    })
    this.setData({
      carts: carts,
      selectAllStatus: selectAllStatus
    })
    this.getTotalPrice()
  },
  /*删除 */
  deleteList(e){
    const index = e.currentTarget.dataset.index
    let carts = this.data.carts
    carts.splice(index,1)
    this.setData({
      carts: carts
    })
    if (!carts.length){
      this.setData({
        hasList: false,
      })
    }else{
      this.getTotalPrice()
    }
  },
  /*绑定增加数量 */
  addCount(e) {
    console.log(e,'添加')
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].total;
    num = num + 1;
    carts[index].total = num;
    this.setData({
      carts: carts,
      totalNum: num
    });
    this.getTotalPrice()
  },
  /*绑定减少数量 */
  minusCount(e) {
    console.log(e,'减少')
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].total;
    if (num <= 0) {
      return false;
    }
    num = num - 1;
    carts[index].total = num;
    this.setData({
      carts: carts,
      totalNum: num
    });
    this.getTotalPrice();
  },
  /*计算总价 */
  getTotalPrice(){
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    let sum = 0;
    for (let i = 0; i < carts.length; i++) {      // 循环列表得到每个数据
      if (carts[i].selected) {                    // 判断选中才会计算价格
        sum += carts[i].total;                     // 所有数量加起来
        total += carts[i].total * carts[i].price;   // 所有价格加起来
      }
    }
    console.log(total,'----')
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalNum: sum,
      totalPrice: total.toFixed(2)
    });
  }
})