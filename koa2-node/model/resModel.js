// 返回模型

class BaseModel {
    constructor(data, message) {
        // 对只传了message做兼容
        if (typeof data === 'string') {
            this.message = data;
            data = null;
            message = null;
        }

        if (data) {
            this.data = data;
        }

        if (message) {
            this.message = message;
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.error = 0;
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.error = -1;
    }
}

module.exports = {
    SuccessModel,
    ErrorModel,
}