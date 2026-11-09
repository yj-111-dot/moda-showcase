// Presentation navigation only. No garment data, model calls or design execution.
'use strict';
const descriptions = [
  ['为设计建立一个起点', '新建项目，选择试衣人物，浏览可用的服装与设计资源。先确定设计对象，再开始编辑。'],
  ['让设计保持可编辑', '在实际桌面演示中，通过 AI 对话建立一件旗袍，再继续调整其版片与外观。此展示页面不会生成或仿真服装。'],
  ['让用料进入设计', '演示中从已有资源选择墨绿色面料，应用到旗袍并保存。局部结构和用料变更分别核对。'],
  ['把一句要求变成局部修改', '演示要求将两侧开衩提高 30 mm。修改对应版片后，核对保存与重开结果，保留其他设计内容。'],
  ['为服装添加局部表达', '应用已有透明花卉贴花，宽约 120 mm，采用单张定位。观察其位置、比例和背景，再保存设计。'],
  ['保存之后，再检查一次', '关闭并重新打开项目，检查版片、缝合、面料与图案仍然一致。保存通过不等于全部仿真质量已经通过。'],
];
const tabs = [...document.querySelectorAll('[data-step]')];
function selectStep(index, focus = false) {
  tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
  document.querySelector('#step-detail').setAttribute('aria-labelledby', tabs[index].id);
  document.querySelector('.detail-number').textContent = String(index + 1).padStart(2, '0');
  document.querySelector('#step-title').textContent = descriptions[index][0];
  document.querySelector('#step-description').textContent = descriptions[index][1];
  if (focus) tabs[index].focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectStep(index));
  tab.addEventListener('keydown', event => {
    const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : event.key === 'ArrowLeft' ? (index + tabs.length - 1) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
    if (next !== null) { event.preventDefault(); selectStep(next, true); }
  });
});
