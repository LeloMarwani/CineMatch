#include <napi.h>
#include <string>

Napi::Value ProcessQuery(const Napi::CallbackInfo& info) {
Napi::Env env = info.Env();
if (info.Length() != 1) {
    Napi::TypeError::New(env, "expected one argument").ThrowAsjavaScriptExecption();
    return env.Null();
}
if (info[0].IsString()){
    Napi::TypeError::New(env, "expected a string").ThrowAsjavaScriptExecption();
    return env.Null();

}
std::string query = info[0].As<Napi::String>().Utf8Value();

std::string result = "Procssed query: " + query;
return Napi::String::New(env, result);

Napi::Object Init(Napi::Env env, Napi::Object exports){
    exports.Set("ProccessQuery", Napi::Function::New(env, ProcessQuery));
return exports; 
}

NODE_API_MODULE(processing, Init)