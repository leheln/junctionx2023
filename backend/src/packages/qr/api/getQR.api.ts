import {Request, Response} from 'express';
import QRCode from 'qrcode';
import logger from '@/core/logger';

export const getQRApi = async (req: Request, res: Response) => {
    const getQRCode = new Promise((resolve, reject) => {
        QRCode.toDataURL(req.session.userId, function (error, dataURL) {
            if (error) {
                reject();
            } else {
                resolve(dataURL)
            }
        });
    });
    try {
        return res.json({qr: await getQRCode});
    } catch (e) {
        logger.error('Error while generating QR Code', e);
        return res.status(500).send({
            message: 'Server error while generating QR Code'
        });
    }
};