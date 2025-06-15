// ignore
//@name:鲨鱼资源
//@webSite:https://shayuapi.com
//@version:1
//@type:101
//@remark:来自shayuapi的影视资源接口
// ignore

async function search(wd, quick) {
  let url = `https://shayuapi.com/api.php/provide/vod/?ac=list&wd=${encodeURIComponent(wd)}`;
  const res = await req(url);
  const json = JSON.parse(res);
  const list = json.list || [];
  return list.map(v => ({
    name: v.vod_name,
    pic: v.vod_pic,
    remarks: v.vod_remarks,
    id: v.vod_id,
  }));
}

async function detail(id) {
  const url = `https://shayuapi.com/api.php/provide/vod/?ac=detail&ids=${id}`;
  const res = await req(url);
  const json = JSON.parse(res);
  const vod = json.list?.[0] || {};
  return {
    name: vod.vod_name,
    pic: vod.vod_pic,
    type: vod.type_name,
    content: vod.vod_content,
    playUrl: vod.vod_play_url,
  };
}

async function home() {
  const url = `https://shayuapi.com/api.php/provide/vod/?ac=detail&pg=1`;
  const res = await req(url);
  const json = JSON.parse(res);
  const list = json.list || [];
  return {
    videos: list.map(v => ({
      name: v.vod_name,
      pic: v.vod_pic,
      remarks: v.vod_remarks,
      id: v.vod_id,
    }))
  };
}

async function play(flag, id) {
  return {
    type: 'video',
    url: id,
  };
}
