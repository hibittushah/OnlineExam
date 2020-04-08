export default class SharedManager {
    
        static myInstance = null;
    
         userId = ''
         authToken = ''
    
    
        /**
         * @returns {SharedManager}
         */
        static getInstance() {
            if (this.myInstance == null) {
                this.myInstance = new SharedManager();
            }
    
            return this.myInstance;
        }
    
        getUserID() {
            return this.userId;
        }
    
        setUserID(id) {
            this.userId = id;
        }

        getAuthToken() {
            return this.authToken;
        }
    
        setAuthToken(token) {
            this.authToken = token;
        }
    }