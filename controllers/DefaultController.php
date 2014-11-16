<?php

class DefaultController extends CiiDashboardController
{
    public function actionIndex()
    {
    	$this->layout = 'dashboard';
        $this->render('index');
    }
}
