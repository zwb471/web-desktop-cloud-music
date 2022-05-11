import api from "@/common/baseProxy"

const downloadMusic = async (id,name='歌名') => {
    try {
        const res = await $axios.get(api + '/song/url?id='+id)

        const res_arr = res['data']['data']
        if ( res_arr.length && res_arr[0]['url'] ){
            fetch(res_arr[0]['url'])
                .then(r=>r.blob())
                .then(res=>{
                    console.log(res)
                    const a = document.createElement('a')

                    const url = window.URL.createObjectURL(res)
                    console.log(URL)
                    // a.href = url
                    // console.log(a)
                    // // a.download = name + '.mp3'
                    // // a.click()
                    window.URL.revokeObjectURL(url)
                })
        }
    }catch (e) {
        console.log(e.message)
    }
}

export default downloadMusic