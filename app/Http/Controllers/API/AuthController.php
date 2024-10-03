<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class AuthController extends BaseController
{
    // //POST[name, email, password]
    public function register(Request $request): JsonResponse
    {
        //validation
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Error de validación', $validator->errors());
        }

        //create user
        $input = $request->all();
        $input['password'] = Hash::make($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('todoapp')->accessToken;
        $success['name'] =  $user->name;

        return $this->sendResponse($success, 'Usuario registrado exitosamente.');
    }

    public function login(Request $request): JsonResponse
    {
        //validation
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Error de validación', $validator->errors());
        }

        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('todoapp')-> accessToken;
            $success['name'] =  $user->name;
            $success['id'] = $user->id;

            return $this->sendResponse($success, 'Sesión iniciada con exito');
        }
        else{
            return $this->sendError('Unauthorised.', ['error'=>'El correo o la contraseña son incorrectos']);
        }
    }

    public function profile()
    {
        $userData = auth()->user();

        return $this->sendResponse($userData, '');
    }

    public function logout()
    {
        $token = auth()->user()->token();
        $token->revoke();
        return $this->sendResponse($token, 'Sesión cerrada con exito');
    }


}
