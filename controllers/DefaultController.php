<?php

class DefaultController extends CiiDashboardController
{
    public function actionIndex()
    {
        $this->render('index');
    }

    public function actionAbout()
    {
        echo "hit";
        $this->render('index');
    }
}
