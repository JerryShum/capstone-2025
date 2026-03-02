export interface scriptAPIResponse {
   message: string;
   script: string;
   video_prompt: string[];
   imageBase64: string;
}

export type ApiResponse = {
   message: string;
   success: boolean;
};
