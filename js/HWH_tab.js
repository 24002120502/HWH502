/**
 * 文件：HWH_tab.js —— 可复用 Tab 选项卡组件（外部引用）
 * 作者：胡文豪
 * 说明：HWH_initTabs 可对页面中任意选项卡容器重复调用，实现复用
 */

/**
 * 功能：初始化一个可复用的 Tab 选项卡组件
 * 参数：HWH_group —— 包含选项卡按钮与内容面板的容器元素
 */
function HWH_initTabs(HWH_group) {
  // 获取当前容器内的全部选项卡按钮与内容面板
  var HWH_btns = HWH_group.querySelectorAll('.HWH_tabBtn');
  var HWH_panels = HWH_group.querySelectorAll('.HWH_panel');

  /**
   * 功能：先清除所有选项卡按钮与内容面板的选中状态
   */
  function HWH_clearActive() {
    for (var HWH_i = 0; HWH_i < HWH_btns.length; HWH_i++) {
      HWH_btns[HWH_i].classList.remove('HWH_active');
    }
    for (var HWH_j = 0; HWH_j < HWH_panels.length; HWH_j++) {
      HWH_panels[HWH_j].classList.remove('HWH_active');
    }
  }

  /**
   * 功能：为每个选项卡按钮绑定点击监听事件，切换显示对应内容面板
   */
  for (var HWH_k = 0; HWH_k < HWH_btns.length; HWH_k++) {
    (function (HWH_index) {
      HWH_btns[HWH_index].addEventListener('click', function () {
        HWH_clearActive();                              // 先清除所有选项卡的选中状态
        this.classList.add('HWH_active');               // 再设置当前元素的选中状态
        HWH_panels[HWH_index].classList.add('HWH_active');
      });
    })(HWH_k);
  }
}
