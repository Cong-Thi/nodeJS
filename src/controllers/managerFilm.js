const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/reponse');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

// lấy danh sách Banner 
const getBanner = async (req, res) => {
    try {
        let data = await model.banner.findAll();
        sucessCode(res, data, "Lấy danh sách Banner thành công")
    } catch (err) {
        
        errorCode(res, "Lỗi Backend")
    }
}

// lấy toàn bộ danh sách Phim 
const getFilm = async (req, res) => {
    try {
        let data = await model.phim.findAll();
        sucessCode(res, data, "Lấy danh sách phim thành công")
    } catch (err) {
        
        errorCode(res, "Lỗi Backend")
    }
}

// Lấy thông tin Phim theo tên phim
const getSearchNameFilm = async (req, res) => {
    try {
        let {ten_phim} = req.body;
        let checkNameFilm = await model.phim.findAll({
            where: {
                ten_phim: {
                    [Op.like]: `${ten_phim}%`
                }
            }
        });
        if(checkNameFilm.length != 0) {

            sucessCode(res, checkNameFilm, "Lấy dữ liệu theo tên film thành công")
        }
       else{
        failCode(res,"Không có film nào có tên như vậy nha")
        };
    } catch (err) {

        errorCode(res, "Lỗi Backend")
    }
}

// lấy danh sách film theo ngày
const getSearchDateFilm = async (req, res) => {
    try {
        let {ngay_khoi_chieu} = req.body;
        let checkDateFilm = await model.phim.findAll({
            where: {
                ngay_khoi_chieu
            }
        });
        if(checkDateFilm.length != 0) {

            sucessCode(res, checkDateFilm, "Lấy dữ liệu film theo ngày thành công")
        }
       else{
        failCode(res,"Ngày"+`${checkDateFilm}`+"Không có film nào cả")
        };
    } catch (err) {

        errorCode(res, "Lỗi Backend")
    }
}

// thêm Phim 
const addFilm = async (req, res) => {
    try {
        let { ten_phim,trailer,hinh_anh,mo_ta,ngay_khoi_chieu,danh_gia,hot,dang_chieu,sap_chieu} = req.body
        let checkFilm = await model.phim.findOne({
            where: {
                ten_phim
            }
        })
        if (!checkFilm) {
            let resuilt = await model.phim.create({
                ten_phim,
                trailer,
                hinh_anh,
                mo_ta,
                ngay_khoi_chieu,
                danh_gia,
                hot,
                dang_chieu,
                sap_chieu
            });
            sucessCode(res, {resuilt }, "Bạn đã thêm phim hành công !")
        }
        else {
            failCode(res, "Phim đã tồn tại. Vui lòng đổi phim khác!")
        }
    }
    catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}

// Cập Nhật thông tin Phim
const updateFilm = async (req, res) => {
    try {
        let { ma_phim } = req.params;
        let { ten_phim,trailer,hinh_anh,mo_ta,ngay_khoi_chieu,danh_gia,hot,dang_chieu,sap_chieu} = req.body

        let checkFilm = await model.phim.findOne({
            where: {
                ma_phim
            }
        });
        if (checkFilm) {
        let resuilt =  await model.phim.update({
                ten_phim,
                trailer,
                hinh_anh,
                mo_ta,
                ngay_khoi_chieu,
                danh_gia,
                hot,
                dang_chieu,
                sap_chieu
            }, {
                where: {
                    ma_phim
                }
            });
            sucessCode(res,"Update phim có id là "+`${ma_phim}`+" thành công");
        } else {
            failCode(res, "Mã Phim có id là "+`${ma_phim}`+" không tồn tại !");
        }

    } catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}
// Lấy danh sách phim phân trang 

const getFilmDevidePage = async (req, res) => {
    try {
        let { offset } = req.body;
        let limit = Math.ceil(await model.phim.count() / offset);
        let resuilt = await model.phim.findAll({
            limit, offset
        })
        let checkOffset = offset
        sucessCode(res, { resuilt, checkOffset }, "Bạn đã lấy danh sách phim phân trang thành công !")
    }
    catch (err) {
        errorCode(res, "Lỗi Backend")
        console.log(err)
    }
}


//commonjs module
module.exports = {
    getBanner,getFilm,getSearchNameFilm,getSearchDateFilm,addFilm,updateFilm,getFilmDevidePage
}