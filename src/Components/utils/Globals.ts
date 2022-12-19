class Globals{}

class DevelopmentGlobals extends Globals{
    public urls = {
        //customer : "https://coupon-system-back.herokuapp.com/customer/",
        customer : "http://localhost:8080/customer/",
        //guest : "https://coupon-system-back.herokuapp.com/guest/"
        guest : "http://localhost:8080/guest/"
    }
}

class ProductionGlobals extends Globals{
    public urls = {
        administrator : "/admin/",
        company : "/company/",
        customer : "/customer/",
        guest : "/guest/",
        general : "/"
    }
}

const globals = process.env.NODE_ENV === "production" ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;