import { GraphRequest, GraphRequestManager, GraphRequestConfig, GraphRequestCallback } from "react-native-fbsdk";

export interface FacebookDataResponse {
    id: string;
    name: string;
    picture: {
        data: {
            url: string;
        };
    };
};

export interface FacebookDataResult {
    id: string;
    name: string;
    photo: string;  
    description?: string;
};

class FacebookLoginService {

    public getFacebookData(): Promise<FacebookDataResult> {
        return new Promise((resolve, reject) => {
            return new GraphRequestManager()
                .addRequest(
                    this.getGraphRequest(
                        '/me?fields=id,name,picture', 
                        (err: Error, result: FacebookDataResponse) => !err ? resolve(this.mapResultFromFacebook(result)) : reject(err)
                    )
                )
                .start();
        });
    }

    private getGraphRequest(path: string, cb: GraphRequestCallback, config?: GraphRequestConfig): GraphRequest {
        return new GraphRequest(path, config, cb);
    }

    private mapResultFromFacebook(facebookData: FacebookDataResponse): FacebookDataResult {
        return facebookData && {
            id: facebookData.id,
            name: facebookData.name,
            photo: facebookData.picture.data.url
        };
    }
}

const facebookLoginService = new FacebookLoginService;

export default facebookLoginService;