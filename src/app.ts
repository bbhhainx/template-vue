/** 
 * Sử dụng để nhận và gửi sự kiện khi giao tiếp với iframe cha 
 * */

/** Khái báo thông tin app */
interface AppInterface {
    /** ID của app theo patten vn.merchant.app_name */
    app_id: string;
    /** Môi trường chạy app */
    env: string;
}

export default class App implements AppInterface {
    app_id: string;
    env: string;

    constructor() {
        this.app_id = 'vn.merchant.example';
        this.env = window.location.hostname == 'localhost' ?
            'localhost' : 'merchant.vn';
    }

    /** Gửi sự kiện tới iframe cha */
    sendEvent(event: any) {
        // * Thêm event source vào data gửi lên iframe cha
        event.source = 'merchant';
        // * Thêm app_id vào data gửi lên iframe cha
        event.app_id = this.app_id;
        // * Thêm thời gian gửi event
        event.date = Date.now();
        // * Gửi event tới iframe cha
        window.parent.postMessage(event, '*');
    }

    /** Nhận sự kiện và data từ iframe cha */
    onEvent(cb: Function) {
        window.addEventListener('message', (event) => {

            // * Log event khi chạy ở môi trường localhost
            if (this.env == 'localhost' && event.data.source == 'merchant') {
                console.log('[App] Nhận event từ Frame:::', event.data);
            }

            // * Log lỗi khi app_id không khớp với khai báo ở iframe cha
            if (
                event.data.source == 'merchant' &&
                this.env == 'localhost' &&
                event.data.app_id != this.app_id
            ) {
                console.log(
                    '>>> [CHÚ Ý] APP ID không khớp:::',
                    this.app_id,
                    ' - ',
                    event.data.app_id
                );
            }

            // * Trả về dữ liệu từ iframe cha
            cb(event.data);
        });
    }
}
