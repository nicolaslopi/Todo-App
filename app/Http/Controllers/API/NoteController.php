<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Note;
use App\Models\Label;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\NoteRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class NoteController extends BaseController
{
    public function index(): JsonResponse
    {
        // $notes = Note::paginate(4);
        // $labels = $notes->labels;
        $notes = Note::with('labels')->paginate(4);

        return $this->sendResponse($notes, '');
    }

    public function create(): JsonResponse
    {
        $labels = Label::all();
        return $this->sendResponse($labels, '');
    }

    public function store(NoteRequest $request): JsonResponse
    {
        try {

            $note = Note::create($request->only('title', 'description', 'user_id'));
            $note->labels()->sync($request->labels);

            return $this->sendResponse($note, 'Creada con exito');

        } catch (\Exception $e) {

            return $this->sendError('Error en el servidor', $e->getMessage());

        }
    }

    public function show(string $id)
    {
        try {


            $note = Note::find($id);
            $labels = $note->labels;

            $response = [
                'note' => $note,
                'labels' => $labels,
            ];

            if(!$note){
                return $this->sendError('Nota no encontrada');
            }

            return $this->sendResponse($response, 'Nota encontrada');

        } catch (\Exception $e) {

            return $this->sendError('Error en el servidor', $e->getMessage(), 500);

        }
    }

    public function edit(): JsonResponse
    {
        $labels = Label::all();
        return $this->sendResponse($labels, '');
    }

    public function update(NoteRequest $request, Note $note)
    {
        try {

            $note->update($request->only('title', 'description'));
            $note->labels()->sync($request->labels);

            return $this->sendResponse($note, 'Actualizada con exito');

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {

            return $this->sendError('Error en el servidor', $e->getMessage(), 500);

        }
    }

    public function destroy(string $id)
    {
        try {
            $deleted = Note::destroy($id);

            if(!$deleted){
                return $this->sendError('Nota no encontrada');
            }

            return $this->sendResponse($deleted, 'Eliminada con exito');

        } catch (\Exception $e) {

            return $this->sendError('Nota no encontrada');

        }
    }

}
