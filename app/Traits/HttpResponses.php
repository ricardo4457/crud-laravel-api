<?php

namespace App\Traits;

trait HttpResponses
{
    protected function success($data, $message = 'Success', $status = 200)
    {
        return response()->json([
            'message' => $message,
            'data' => $data,
        ], $status);
    }

    protected function error($message, $status = 400)
    {
        return response()->json([
            'message' => $message,
        ], $status);
    }
}
