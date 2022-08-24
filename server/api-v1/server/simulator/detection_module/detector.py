import numpy as np
from scipy.special import erfc
from sklearn.metrics import confusion_matrix


def get_scores(TN, FP, FN, TP):
    # Sensitivity, hit rate, recall, or true positive rate
    TPR = TP/(TP+FN)
    # Specificity or true negative rate
    TNR = TN/(TN+FP)
    # Precision or positive predictive value
    PPV = TP/(TP+FP)
    # Negative predictive value
    NPV = TN/(TN+FN)
    # Fall out or false positive rate
    FPR = FP/(FP+TN)
    # False negative rate
    FNR = FN/(TP+FN)
    # False discovery rate
    FDR = FP/(TP+FP)

    # Overall accuracy
    ACC = (TP+TN)/(TP+FP+FN+TN)

    return ACC, TNR, FPR, FNR, TPR


def chauvenet(array):
    mean = array.mean()
    stdv = array.std()
    N = len(array)
    criterion = 1.0/(2*N)
    d = abs(array-mean)/stdv
    prob = erfc(d)
    return prob < criterion


def statistical_detection(weights, window_size=-1):

    weights = np.array(weights)
    preds = chauvenet(weights[0 if window_size == -1 else -window_size:])

    return preds[-1]


def test(weights, labels, window_size=-1):
    accs = []
    tnrs, fprs, fnrs, tprs = [], [], [], []

    preds, targets = [], []
    for t in range(len(weights)):
        pred = statistical_detection(weights[:t+1], window_size=window_size)
        preds.append(pred)
        targets.append(labels[t])
        tn, fp, fn, tp = confusion_matrix(
            targets, preds, labels=[0, 1]).ravel()
        tnr, fpr, fnr, tpr = get_scores(tn, fp, fn, tp)
        acc = np.sum(np.array(preds) == np.array(targets)) / (t + 1)

        accs.append(acc)
        tnrs.append(tnr)
        fprs.append(fpr)
        fnrs.append(fnr)
        tprs.append(tpr)

    return accs, tnrs, fprs, fnrs, tprs
