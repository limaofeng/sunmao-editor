import React from 'react';

function Sidebar() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#727d83',
        fontSize: 16,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span>侧边面板1</span>
        <span style={{ fontSize: 10, marginTop: 20 }}>右侧边缘可以调整面板宽度</span>
      </div>
    </div>
  );
}

export default Sidebar;
