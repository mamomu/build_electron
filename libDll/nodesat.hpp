#include <napi.h>
#include <string.h>
#include <iostream>

#ifdef _WIN32
    #include <windows.h>
#endif

using Napi::Boolean;
using Napi::CallbackInfo;
using Napi::Env;
using Napi::Error;
using Napi::Function;
using Napi::Number;
using Napi::Object;
using Napi::String;
using Napi::TypeError;
using Napi::Value;

using std::string;


#ifndef NODESITEF_H // include guard
#define NODESITEF_H 1

#include "promises/promiseWorker.cpp"

typedef const char* (*ImpComprovante)(string);
typedef const char* (*ConsultarSat)();
typedef const char* (*VendaSat)(string);
typedef int (*SomaTotalDll)(int, int);

Value carregarDLL(const CallbackInfo &info);

namespace functionexample {
  const char* impComprovante(string jsonDados);
  Value impComprovanteWrapped(const CallbackInfo &info);

  const char* consultarSat();
  Value consultaSatWrapped(const CallbackInfo &info);

  const char* vendaSat(string jsonVenda);
  Value vendaSatWrapped(const CallbackInfo &info);

  int somaTotal(int valor1, int valor2);
  Number somaTotalWrapped(const CallbackInfo &info);
}


#endif /* NODESITEF_H */