import {promisify} from 'util'
import qrCode from 'qrcode';


const createQRCode = (content) => promisify(qrCode.toDataURL)(content);


export default createQRCode;